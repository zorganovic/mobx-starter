import heapdump from 'heapdump';

/**
 * Launch the garbage collection
 * and get memory usage after it's done
 */
function launchDiagnostics() {
    setInterval(function(){
        try {
            global.gc();
        } catch(err) {
            console.error('[heapdump error]', err)
        }

        let heapUsed = process.memoryUsage().heapUsed / (1024*1024);

        console.warn("Program is using " + heapUsed + " bytes of Heap.");

        heapdump.writeSnapshot();

    }, 6000);
}

if (process.env.NODE_ENV === 'development') {
    //launchDiagnostics()
}

