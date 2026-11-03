"""Upload/activate the blog child theme. Set TPB_SSH_HOST, TPB_SSH_PORT, TPB_SSH_USER, TPB_SSH_PASS."""

import os
from pathlib import Path

import paramiko

HOST = os.environ["TPB_SSH_HOST"]
PORT = int(os.environ.get("TPB_SSH_PORT", "65002"))
USER = os.environ["TPB_SSH_USER"]
PASS = os.environ["TPB_SSH_PASS"]
LOCAL = Path(__file__).resolve().parent / "13thpencil-blog"
REMOTE = "/home/u258786982/domains/blog.13thpencil.com/public_html/wp-content/themes/13thpencil-blog"
WP = "/home/u258786982/domains/blog.13thpencil.com/public_html"


def ensure_dir(sftp, path: str) -> None:
    parts = path.strip("/").split("/")
    cur = ""
    for part in parts:
        cur += "/" + part
        try:
            sftp.stat(cur)
        except FileNotFoundError:
            sftp.mkdir(cur)


def main() -> None:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        HOST,
        port=PORT,
        username=USER,
        password=PASS,
        timeout=60,
        banner_timeout=60,
        auth_timeout=60,
        allow_agent=False,
        look_for_keys=False,
    )
    sftp = client.open_sftp()
    ensure_dir(sftp, REMOTE)
    for root, _dirs, files in os.walk(LOCAL):
        for name in files:
            if name == "SETUP.md":
                continue
            local_path = Path(root) / name
            rel = local_path.relative_to(LOCAL).as_posix()
            remote_path = f"{REMOTE}/{rel}"
            ensure_dir(sftp, os.path.dirname(remote_path))
            sftp.put(str(local_path), remote_path)
            print("put", rel)
    sftp.close()

    cmds = f"cd {WP} && wp theme activate 13thpencil-blog && wp cache flush || true && wp litespeed-purge all || true"
    stdin, stdout, stderr = client.exec_command(cmds)
    print(stdout.read().decode())
    err = stderr.read().decode()
    if err.strip():
        print(err[-1500:])
    client.close()
    print("DONE")


if __name__ == "__main__":
    main()
