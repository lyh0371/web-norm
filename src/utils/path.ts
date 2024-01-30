import { getEnv } from './env'
import path from 'path'
export const getpath = (name: string) => {
  const basePath = getEnv('base') as string
  return path.resolve(basePath, name)
}
