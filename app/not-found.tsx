export default function NotFound() {
  return (
    <iframe
      src="/_handoff/404.html"
      title="Page not found"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
        background: "#181A1C",
      }}
    />
  );
}
