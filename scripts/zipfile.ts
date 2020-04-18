import * as archiver from 'archiver';
import * as fs from 'fs';
import * as path from 'path';

const output = fs.createWriteStream(path.join(__dirname,'../dist.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
 
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function() {
  console.log('Data has been drained');
});
 
archive.pipe(output);

archive.directory('dist/', false);
archive.finalize();