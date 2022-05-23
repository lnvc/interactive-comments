// call from cf webhook

export default async function revalidate(req: any, res: any) {
  if (!req.query.secret || req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'invalid token' });
  }

  try {
    await res.unstable_revalidate('/');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('error revalidating');
  }
};
