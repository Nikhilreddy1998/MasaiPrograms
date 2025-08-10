const { sendToMail } = require('../utils/sendEmail')
const { generatePDF } = require('../utils/pdfkit')
const BookModel = require('../models/book.model')
const UserModel = require('../models/user.model')
const fs = require('fs')
const Redis = require('ioredis')
const redis = new Redis()

exports.createBook = async()=>{
        let books = await redis.get('bulkBooks')
        if(books){
            books = JSON.parse(books)
            let userId = books.pop()
            let passedBook = 0
            let failedBook = 0
            for(let book of books){
                try {
                    await BookModel.create({...book,userId})
                    passedBook++
                } catch (error) {
                    failedBook++
                }
            }
            let time = new Date()
            const report = `Bulk books update report:\nTask initiated by: ${userId}\nPassed: ${passedBook}\nFailed: ${failedBook}\nTime: ${time}\n\n`;
            let newReport = []
            newReport.push(report)
            newReport.push(userId)
            await redis.set('report',JSON.stringify(newReport))
            fs.appendFileSync('./bulkCreation.log',report)
            console.log(report)
            await redis.del('bulkBooks')
        }else {
            console.log("No Books Found To Update in Bulk");
        }
}

exports.reportCron = async()=>{
    let newReport = await redis.get('report')
    if(newReport){
        newReport = JSON.parse(newReport)
        let userId = newReport.pop()
        let report = newReport.pop()
        let user = await UserModel.findById(userId)
        generatePDF(userId,report)
        let to = user.email
        let subject = "Bulk Book Upload Report"
        let text = "Report of you bulk update"
        let attachments = [
            {
                filename:"Report.pdf",
                path:`./reports/${userId}.pdf`
            }
        ]
        sendToMail(to,text,subject,attachments)
        await redis.del('report')
        console.log('Report has been sended to the user')
    }else{
        console.log("No new reports")
    }
}