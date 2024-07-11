export default class Clock{
    expectedTime = 0;
    timeout;
    callback;
    interval;

    constructor(callback, interval){
        this.callback = callback;
        this.interval = interval;
        this.expectedTime = 0;
        this.timeout = NULL;
    }

    start = () => {
        let date = new Date();
        const mili = date.getMilliseconds();
        let diff;
        if(mili < this.interval){
            diff = this.interval - mili;
        } else {
            diff = 2 * this.interval - mili;
        }
        this.expectedTime = date.getTime() + diff;

        clearTimeout(this.timeout);

        this.timeout = setTimeout(this.round, this.interval);
    };

    round = () => {
        const drift = Date.now() - this.expectedTime;
        this.callback(this.expectedTime);
        this.expectedTime += this.interval;

        const remainingTime = this.interval - drift;

        clearTimeout(this.timeout);

        this.timeout = setTimeout(this.round.bind(this), remainingTime);
    };

    static second(endTime, startTime){
        return Math.floor((endTime - startTime) / 1000);
    }
}