interface AdProps {
  slot?: string;
  style?: React.CSSProperties;
  label?: string;
}

export default function AdPlaceholder({ style, label = 'Advertisement' }: AdProps) {
  return (
    <div className="ad-placeholder" style={style}>
      <span style={{ fontSize: 20 }}>📢</span>
      <span>{label}</span>
      <span className="ad-label">Your Ad Here</span>
    </div>
  );
}
