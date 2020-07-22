
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
        this.animations = []
    }
    tick() {
        let t = Date.now() -  this.startTime

        for (let animation of this.animations) {
            if (t > animation.duration + animation.delay)
                continue
            let { object, property, template, start, end, delay, timingFunction } = animation
           let proression = timeingFunction(t-dalay);
           let value = start + progression
            object[property] = template(timingFunction(start, end)(t - delay))
            console.log( template(timingFunction(start, end)(t - delay)))
        }
        requestAnimationFrame(() => this.tick())
    }
    start() {
        this.startTime = Date.now()
        this.tick()
    }
    add(animation) {
        console.log(animation)
        this.animations.push(animation)
    }
}
class Animation {
    constructor( object, property,template,  start, end, duration, delay, timingFunction ) {
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay||0;
        this.timingFunction = timingFunction || ((start, end) => {
            return (t) => {

                return start + (t / duration) * (end - start)}
        })

    }
}

// export default {
//     Timeline
//     , Animation
// }