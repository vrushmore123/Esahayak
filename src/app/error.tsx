"use client";
export default function Error({ error }: { error: Error }) {
  return <div role="alert">Error: {error.message}</div>;
}
