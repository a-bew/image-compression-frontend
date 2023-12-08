import s from './hamburger.module.scss';

const Hamburger = ()=>{
    return (
        <div className={s["hamburger"]}>
        <div className={s["bar"]}></div>
        <div className={s["bar"]}></div>
        <div className={s["bar"]}></div>
        </div>
    )
}

export default Hamburger;