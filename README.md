<h1>Open-Calais</h1>
<h4>Nodejs based Command Line tool to use the Open-Calais API</h4>
<p>Open-Calais is a tool to send text document to the Open Calais Server and to get tagged data.</p>
<h5>A Note about Output</h5>
<p>The CSV file output by the tool follows the same order as in Input.txt and Names may repeat depending upon if Name is recognized by different Tags.</p>

<h3>Installation</h3>
   1. `npm i Open-Calais`

   2. <h5>Your Open-Calais API Key or API Token</h5> 
   <p>You have to register on Open Calais website to get an API for autorized access. When you get an API, you have to have to add it in the code in the first line of oc.js like this:-</p>
   
   `var TOKEN = "YOUR API KEY"`

<h3>Test command</h3>
`node oc -i ./Input.txt -o ./Output.csv`

<h3>Usage</h3>
<p>This tool is a command line Tool. Here is the Usage :-</p>

```
Usage: node oc [Options]

Options:
  -i, --In    File path to input text file.
              Use './' for current folder path                        [required]
  -o, --Out   File path to output csv file with .csv extension.
                                            [required] [default: "./output.csv"]
  -h, --help  Show help                                                [boolean]

Copyright 2015 Vikas Gautam
```

<h4>Donate</h4>
<p>If this repository helps you anyhow, please don't mind coming back and 
   <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=F3QQCWFPWHBYE" target="_blank">Buy Me Coffee</a>
OR you can use 
   <a href="https://gratipay.com/~xcelancer/" target="_blank">Gratipay</a>
to show your appreciation and gratitude.
</p>