var args = require("yargs")
            .usage("Usage: node oc [Options]")
            .demand(["i", "o"])
            .alias("i", "In")
            .describe("i", "File path to input text file.\nUse './' for current folder path")
            .alias("o", "Out")
            .describe("o", "File path to output csv file with .csv extension.")
            .default("o", "./output.csv")
            .help("h")
            .alias("h", "help")
            .epilog("Copyright 2015 Vikas Gautam")
            .argv

var request = require("request")
var fs = require("fs")
var TOKEN = "wInkrGNmedplcuUoQBJppYP1VZ1zmwou"
var inputData

fs.readFile(args.i, function (err, data)  {
   inputData = data.toString().replace(/(\r\n|\r|\n)/g, "\n").trim()
   tagIt(inputData)
})

function tagIt(rawData) {
   request({
         method: "POST",
         url: "https://api.thomsonreuters.com/permid/calais?access-token=" + TOKEN,
         body: rawData,
         headers: {
            "Content-Type": "text/raw",
            "OutputFormat": "application/json",
            "X-AG-Access-Token": TOKEN,
            "omitOutputtingOriginalText":true
         }
      },
      function (err, resp, body) {
         if (err) { console.log("Error"); return }
         parseToCSV(JSON.parse(body.toString()))
         writer.end()
      }
   )   
}

function parseToCSV(json) {
   var raw = JSON.stringify(json)
   var names = [], tags = []
   // Looping through matches
   raw.replace(/"_type":"(.*?)".*?"exact":"(.*?)"/g, function (match, $1, $2) {
      var tag = $1.toString().trim()
      var nameList = $2.toString().trim().split("\\n")
      nameList.forEach(function (name, i) {
         tags.push(tag)
         names.push(name)         
      })
   })

   var output = ""
   lines = inputData.split("\n")
   lines.forEach(function (line, i) {
      // Checking for the whole name
      var rowNum = names.indexOf(line.trim())
      output = rowNum > -1 ? [output + line, tags[rowNum], names[rowNum] + "\n"].join(",") : output + line + "\n"
      // Checking for the individual names
      line.trim().split(" ").forEach(function (word, i) {
         rowNum = names.indexOf(word)
         output = rowNum > -1 ? [output + line, tags[rowNum], names[rowNum] + "\n"].join(",") : output
      })
   })
   fs.writeFileSync(args.o, output, "UTF-8")
}