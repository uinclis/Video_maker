const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apikey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {  //async  means the return will be a "promise"
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2') //https://algorithmia.com/algorithms/web/WikipediaParser
        const wikipediaAnswer = await wikipediaAlgorithm.pipe(content.searchTerm) //await means that the code will only continue after this function is completly over 
        const wikipediaContent = wikipediaAnswer.get()

        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content0) {
        const withoutBlankLinesAndMarkdowns = removeBlankLinesAndMarkdowns(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdowns)
        console.log(withoutDatesInParentheses)

        content.sourceContentSanitized = withoutDatesInParentheses

        //Remove all blank lines and all markdowns (=) in the text
        function removeBlankLinesAndMarkdowns(text) {
            const allLines = text.split('\n')

            const withoutBlankLinesAndMarkdowns = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                return true
            })

            return withoutBlankLinesAndMarkdowns.join(' ')
        }
    }

    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ') //I don't know what is {{spnd}} and so I needed to FORCE [.replace(/  /g, ' ')] the replaiciment for a normal SPACE
    }

    function breakContentIntoSentences(content){
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        console.log(sentences)
    }

}

module.exports = robot 