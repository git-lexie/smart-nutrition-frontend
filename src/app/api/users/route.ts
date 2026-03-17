// References:
// Using MongoDB with Next.js: https://mongoosejs.com/docs/nextjs.html
// Building APIs with Next.js: https://nextjs.org/blog/building-apis-with-nextjs

import { NextResponse } from 'next/server';

export async function GET() {
  // Sample endpoint only.
  return NextResponse.json([
    { id: 1, name: 'Juan Dela Cruz', },
    { id: 2, name: 'Barbie Oppenheimer' }
  ])
}

export async function POST() {
  // Sample endpoint only.
}

export async function PUT() {
  // Sample endpoint only.
}

export async function DELETE() {
  // Sample endpoint only.
}