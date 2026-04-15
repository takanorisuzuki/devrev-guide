import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const nextConfig = require('eslint-config-next')

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [...nextConfig]

export default eslintConfig
