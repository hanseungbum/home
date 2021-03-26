const {
    Worker, isMainThread, parentPort,
}= require('worker_threads');

if(isMainThread){
    console.log(__filename+1);

    const worker = new Worker(__filename);
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit',() => console.log('worker exit'));
    worker.postMessage('ping');

} else {
    console.log(__filename+2);

    parentPort.on('message', (value)=>{
        console.log('from parent', value);
        parentPort.postMessage('pong');
        parentPort.close();
    })

}