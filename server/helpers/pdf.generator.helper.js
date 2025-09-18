import PDFDocument from "pdfkit"

const sendPdfResponse = (res, filename, contentGenerator) => {
  const doc = new PDFDocument()
  res.setHeader("Content-Type", "application/pdf")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`)
  doc.pipe(res)

  contentGenerator(doc)
  doc.end()
}

export { sendPdfResponse }