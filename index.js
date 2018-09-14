/**
 * @file   mofron-comp-{@comp-name}/index.js
 * @author simpart
 */
const mf     = require('mofron');
const Frame  = require('mofron-comp-frame');
const Hrzpos = require('mofron-effect-hrzpos');
const Vrtpos = require('mofron-effect-vrtpos');

/**
 * @class mofron.comp.DbdrFrame
 * @brief double border frame component for mofron
 */
mf.comp.DbdrFrame = class extends Frame {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('DbdrFrame');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.addChild(this.innerFrame());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    innerFrame (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_innfrm) {
                    let frm = new Frame({
                        effect : [
                            new Hrzpos('center','-' + frm.border().width()),
                            new Vrtpos('center')
                        ]
                    });
                    frm.target().styleListener(
                        'border-width',
                        (p1,p2,p3) => {
                            try {
                                let hrzpos = p3.innerFrame().getConfig('effect', 'HrzPos');
                                if (null === hrzpos) {
                                    return;
                                }
                                hrzpos.offset('-' + p1['border-width']);
                                hrzpos.execute();
                            } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        },
                        this
                    );
                    this.innerFrame(frm);
                }
                return this.m_innfrm;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Frame')) {
                throw new Error('invalid parameter');
            }
            this.m_innfrm = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    border (p1, p2) {
        try {
            if ((undefined === p1) && (undefined === p2)) {
                return super.border();
            }
            if (undefined !== p1) {
                super.border(p1);
            }
            if (undefined !== p2) {
                this.innerFrame().border(p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    interval (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_intvl) ? mf.func.getSizeObj('0.04rem') : this.m_intvl;
            }
            /* setter */
            this.m_intvl = mf.func.getSizeObj(prm);
            this.size(this.width(), this.height());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (prm) {
        try {
            let ret = super.width(prm);
            if (undefined === ret) {
                this.innerFrame().width(
                    this.sizeValue('width').diff(
                        this.interval().value()*2 + this.interval().type()
                    )
                );
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            let ret = super.height(prm);
            if (undefined === ret) {
                this.innerFrame().height(
                    this.sizeValue('height').diff(
                        this.interval().value()*2 + this.interval().type()
                    )
                );
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.DbdrFrame;
/* end of file */
