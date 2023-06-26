import Image from "next/image";
import waterDrop from "./resources/images/water_drop.png";
import imageLavage1 from "./resources/images/lavage_1.png";
import imageLavage2 from "./resources/images/lavage_2.png";
import imageLavage3 from "./resources/images/lavage_3.png";

{/*<nav {...props} className={style.navbar}>
            <NavLink to={'/'} className={style.brand}>{brand}</NavLink>
            <ul className={style.navLinks}>
                {
                    links.map(link =>
                        <NavItem
                            key={'nav-link-to-' + link.name}
                            to={link.path}
                            active={props.activepath === link.path}
                        >
                            {link.name}
                        </NavItem>)
                }
            </ul>
            <NavLink to={'/cart'} className={'c-white'}>
                <Bag fill={'white'} height={25} width={20} />
            </NavLink>
        </nav>*/}


<Image
    src={waterDrop}
    alt={'water-drop'}
    style={{width: '100%', height: "auto", position: "relative", backgroundImage: "linear-gradient(to bottom, transparent, #837960)"}}
    className={'d-none d-md-block hide-image-transition abc'}
/>
