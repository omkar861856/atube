interface Props {
  id?: string;
}

/**
 * Native Banner ad
 * Place anywhere in the page body — renders a native ad widget.
 */
export default function NativeBanner({ id = "2020498" }: Props) {
  return (
    <div 
      className="ad-container" 
      style={{ 
        width: '100%', 
        minHeight: 100, 
        display: 'flex', 
        justifyContent: 'center',
        margin: '10px 0'
      }}
    >
      <div data-banner-id={id}></div>
    </div>
  );
}
