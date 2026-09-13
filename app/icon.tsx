import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 40,
        }}
      >
        <div style={{ color: '#FAF8F5', fontSize: 110, fontWeight: 700, fontFamily: 'serif' }}>
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
