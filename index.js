
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const process = require('process');


const args = process.argv.slice(2);
if (args.length !== 4) {
    console.error('Incorrect number of arguments');
    process.exit(1);
  }
const startTime = args[0];
const timeDuration = args[1];
const inputFile = args[2];
const outputFile=args[3];

ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg(inputFile)
.on('start', function(commandLine) {
  console.log('Spawned Ffmpeg with command: ' + commandLine);
})
 //.setStartTime(startTime)
//.outputOption('-ss',startTime)
  //.seek(startTime)
  .seekOutput(startTime)
  .setDuration(timeDuration)
  .output(outputFile)
  .addOption('-profile:v')
  .addOption('baseline')
  .addOption('-level', 3.0)
  .addOption('-start_number', 0)
  .addOption('-hls_list_size', 0)
  .addOption('-f hls')
  .on('end', function(err) {
    if(!err) { console.log('conversion Done') }
  })
  .on('error', function(err){
    console.log('error: ', err)
  }).run();



