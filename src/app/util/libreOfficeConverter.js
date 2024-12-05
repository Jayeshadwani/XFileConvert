import { exec } from 'child_process';
import path from 'path';

export const convertFileUsingLibreOffice = (inputFilePath, outputDir, conversionType) => {
  return new Promise((resolve, reject) => {
    const outputFilePath = path.join(outputDir, `${Date.now()}-converted.${conversionType}`);
    
    const libreofficeCommand = `libreoffice --headless --convert-to ${conversionType} --outdir ${outputDir} ${inputFilePath}`;

    exec(libreofficeCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error during conversion:', error);
        return reject('File conversion failed');
      }
      if (stderr) {
        console.error('LibreOffice stderr:', stderr);
        return reject('LibreOffice error');
      }

      console.log('LibreOffice stdout:', stdout);
      resolve(outputFilePath);
    });
  });
};
