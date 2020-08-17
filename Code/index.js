import readline from 'readline-sync'

function start(){
    const content = {}

    content.seachTerm = askAndReturnSearchTerm()

    function askAndReturnSearchTerm(){
      return readline.question('Type a Wikipedia seach term: ') //https://www.youtube.com/results?search_query=readline+vsc
    }

    console.log(content)
}

start()