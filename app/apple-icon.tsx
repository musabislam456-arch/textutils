import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1c1917',
        }}
      >
        <div style={{ color: '#FAF8F5', fontSize: 102, fontWeight: 700, fontFamily: 'serif' }}>
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
