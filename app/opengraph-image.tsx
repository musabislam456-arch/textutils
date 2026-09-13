import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TextUtils — Distraction-Free Text Tools for Writers & Students';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF8F5',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              background: '#1c1917',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 700,
              color: '#FAF8F5',
            }}
          >
            T
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, color: '#1c1917', letterSpacing: -1 }}>
            TextUtils
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#78716c', maxWidth: 900, textAlign: 'center', fontStyle: 'italic' }}>
          Distraction-Free Text Tools for Writers &amp; Students
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['Word Count', 'Case Convert', 'Diff Check', 'Dedupe'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 24px',
                borderRadius: 6,
                background: '#fef3c7',
                color: '#78350f',
                fontSize: 20,
                border: '1px solid #fde68a',
                fontFamily: 'sans-serif',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
