import fs from 'fs/promises'

export const touch = async filepath => {
  try {
    const time = new Date()
    await fs.utimes(filepath, time, time)
  } catch (err) {
    const filehandle = await fs.open(filepath, 'w')
    await filehandle.close()
  }
}
