interface PreloaderProps {
  progress: any;
}
export const Preloader = ({ progress }: PreloaderProps) => {
  const width = `${progress}%`;
  return (
    <div style={{ width: "300px", backgroundColor: "#ddd", height: "20px" }}>
      <div style={{ width, backgroundColor: "blue", height: "20px" }} />
    </div>
  );
};
