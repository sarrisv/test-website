const base = import.meta.env.BASE_URL;

export const resolvePath = (path: string) => {
  if (path.startsWith("http")) return path;
  const cleanPath = path.replace(/^\/+/, '');
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
};

export const isActive = (urlPathname: string, itemPath: string) => {
  const resolvedPath = resolvePath(itemPath);
  if (resolvePath("/") === resolvedPath && urlPathname !== resolvedPath) return false; 
  return urlPathname.startsWith(resolvedPath);
}
