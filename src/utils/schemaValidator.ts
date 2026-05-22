import fs from "fs/promises"
import path from "path"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import { createSchema } from "genson-js"

const SCHEMA_BASE_PATH = './src/api/responseSchemas'
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export async function schemaValidator(dirName: string, fileName: string, responseBody: object, createdSchemaFlag: boolean): Promise<void> {
    const schemaPath = path.join(SCHEMA_BASE_PATH, dirName, `${fileName}_schema.json`)

    await newSchemaGeneration(schemaPath, responseBody, createdSchemaFlag)

    const schema = await loadSchema(schemaPath)
    const validate = ajv.compile(schema)

    const valid = validate(responseBody)
    if (!valid) {
        throw new Error(
            `Schema validation for ${fileName}_schema.json failed:\n\n` +
            `${JSON.stringify(validate.errors, null, 2)}\n` +
            `________________________________________`
        )
    }
}

async function loadSchema(schemaPath: string): Promise<object> {
    try {
        const schemaContent = await fs.readFile(schemaPath, 'utf-8')
        return JSON.parse(schemaContent)
    } catch (error) {
        throw new Error(`Failed to read the schema file: ${error}`)
    }
}

async function newSchemaGeneration(schemaPath: string, responseBody: object, createdSchemaFlag: boolean) {
    if (createdSchemaFlag) {
        try {
            const generatedSchema = createSchema(responseBody)
            await fs.mkdir(path.dirname(schemaPath), { recursive: true })
            await fs.writeFile(schemaPath, JSON.stringify(generatedSchema, null, 2))
        } catch (error: any) {
            throw new Error(`Failed to create schema file: ${error.message}`)
        }
    }
}