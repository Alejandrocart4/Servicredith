'use strict'

const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { Sequelize, QueryTypes } = require('sequelize')

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]
const serviceRoot = path.resolve(__dirname, '..')
const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

const previewProductIds = [
  '6db92031-9a7a-4680-8a4f-2b6af4db2100',
  '6db92031-9a7a-4680-8a4f-2b6af4db2101',
  '6db92031-9a7a-4680-8a4f-2b6af4db2102',
  '6db92031-9a7a-4680-8a4f-2b6af4db2103',
  '6db92031-9a7a-4680-8a4f-2b6af4db2104',
  '6db92031-9a7a-4680-8a4f-2b6af4db2105',
]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { ...config, logging: false }
)

function runSeeder(seedFile) {
  console.log(`[seed:local] Ejecutando ${seedFile}`)
  const result = spawnSync(
    pnpmCommand,
    ['exec', 'sequelize-cli', 'db:seed', '--seed', seedFile],
    {
      cwd: serviceRoot,
      stdio: 'inherit',
      env: process.env,
      shell: process.platform === 'win32',
    }
  )

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`El seeder ${seedFile} fallo con codigo ${result.status}`)
  }
}

async function countTableRows(tableName) {
  const [row] = await sequelize.query(
    `SELECT COUNT(*)::int AS count FROM cd.${tableName}`,
    { type: QueryTypes.SELECT }
  )
  return Number(row.count || 0)
}

async function countPreviewProducts() {
  const [row] = await sequelize.query(
    'SELECT COUNT(*)::int AS count FROM cd.products WHERE product_id IN (:ids)',
    {
      replacements: { ids: previewProductIds },
      type: QueryTypes.SELECT,
    }
  )
  return Number(row.count || 0)
}

async function main() {
  await sequelize.authenticate()

  const [companies, users, products, inventories] = await Promise.all([
    countTableRows('companies'),
    countTableRows('users'),
    countTableRows('products'),
    countTableRows('stores_inventories'),
  ])

  const hasCoreData = companies > 0 || users > 0 || products > 0 || inventories > 0

  if (!hasCoreData) {
    runSeeder('20260521083057-mock-company-data.js')
  } else {
    console.log('[seed:local] La base ya tiene datos; se omite el seed demo principal.')
  }

  const previewProducts = await countPreviewProducts()
  if (previewProducts === 0) {
    runSeeder('20260614094500-homepage-preview-demo-data.js')
  } else {
    console.log('[seed:local] Los productos de vista previa ya existen; se omite ese seed.')
  }

  console.log('[seed:local] Datos locales listos.')
}

main()
  .catch((error) => {
    console.error(`[seed:local] ${error.message}`)
    process.exitCode = 1
  })
  .finally(async () => {
    await sequelize.close()
  })
