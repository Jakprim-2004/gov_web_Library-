import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const README_MAP: Record<string, string> = {
  root: join(process.cwd(), 'README.md'),
  combined: join(process.cwd(), 'README_combined.md'),
  'gov-token-css': join(process.cwd(), 'README_gov-token-css.md'),
  'gov-layout': join(process.cwd(), 'README_gov-layout.md'),
  'gov-sso-login': join(process.cwd(), 'README_gov-sso-login.md'),
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doc = searchParams.get('doc') || 'root';
    const readmePath = README_MAP[doc] || README_MAP.root;
    const content = readFileSync(readmePath, 'utf-8');
    return NextResponse.json({ content, doc });
  } catch {
    return NextResponse.json({ content: '', error: 'Failed to read README.md' }, { status: 500 });
  }
}
