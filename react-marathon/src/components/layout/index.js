import s from './style.module.css';
import cn from "classnames"


const Layout = ({id, title, urlBg, colorBg, children}) => {

    const style = {};
    if (urlBg) {
        style.backgroundImage = `url(${urlBg}`
    }
    if (colorBg) {
        style.backgroundColor = colorBg
    }

    return (
        <section className={s.root} style={style} id={id}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>{title}</h3>
                        <span className={s.separator}/>
                    </div>
                    <div className={cn(s.desc, s.full)}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;
