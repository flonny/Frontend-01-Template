
/**
 * 
 * new Animation({object,property,start,end,duration,delay,timingFunction})
 * animation.start()
 * animation.stop()
 * animation.pause()
 * animation.resume()
 * let timeline = new Timeline
 * timeline.add(animation)
 * timeline.add(animation2)
 * timeline.start()
 * timeline.stop()
 * timeline.pause()
 * timeline.resume()
 * setTimeout
 * setInterval()
 * requestAnimationFrame
 * 
 */
class Timeline {
    constructor() {
        this.state = 'inited'
        this.requestID = null
        this.pauseTime = null
        this.animations = []
    }
    tick() {
        let t = Date.now() - this.startTime
        let activeAnimations = this.animations.filter(animation => !animation.finished)
        for (let animation of activeAnimations) {
            let { object, property, template, start, end, duration, delay, timingFunction,startTime } = animation

            let progression = timingFunction((t - delay-startTime) / duration);
            if (t > duration + delay) {
                animation.finished = true
                progression = 1
            }
            let value = start + progression * (end - start)
            object[property] = template(value)
        }
        if (activeAnimations.length) { this.requestID = requestAnimationFrame(() => this.tick()) }


    }
    start() {
        if (this.state != 'inited')
            return
        this.state = "playing"
        this.startTime = Date.now()
        this.tick()
    }
    pause() {
        if (this.state != 'playing')
            return
        this.state = "paused"
        this.pauseTime = Date.now()
        if (this.requestID !== null)
            cancelAnimationFrame(this.requestID)
    }
    resume() {
        if (this.state != 'paused')
            return
        this.state = "playing"
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }

    restart() {
        if (this.state == "playing") {
            this.pause();
        }
        for(let animation of this.animations) {
            animation.finished = false
        }
        // = []
        this.requestID = null
        this.pauseTime = null
        this.state = "playing"
        this.startTime = Date.now()
        this.tick()
    }
    add(animation, startTime) {
        animation.finished = false

        if (this.state == "playing") {
            animation.startTime = startTime !== void 0?startTime: Date.now()-startTime
        } else {
            animation.startTime = startTime !== void 0?startTime: 0
        }
        this.animations.push(animation)

    }
}
class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;

    }
}

// export default {
//     Timeline
//     , Animation
// }