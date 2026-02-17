const base = import.meta.env.BASE_URL;

export const resolvePath = (path: string) => path.startsWith("http") ? path : `${base}${path}`;

export const isActive = (urlPathname: string, itemPath: string) => {
  const resolvedPath = resolvePath(itemPath);
  if (resolvePath("/") === resolvedPath && urlPathname !== resolvedPath) return false; 
  return urlPathname.startsWith(resolvedPath);
}