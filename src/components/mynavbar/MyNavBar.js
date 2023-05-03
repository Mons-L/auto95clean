import {Container, Nav, Navbar} from "react-bootstrap";
import Bag from '../../resources/icons/Bag';

const links = [
    {path: '/', name: 'Acceuil'},
    {path: '/rates', name: 'Tarifs'},
    {path: '/products', name: 'Produits'},
    {path: '/dashboard', name: 'Mon espace'}
];
const cartLink = {path: '/cart', name: 'Panier'};
const brand = "Auto95Clean";

const MyNavBar = props => {
    return(
        <Navbar {...props} collapseOnSelect={true} expand={'md'} className={'bg-main-linear-gradient font-size-14 p-0'} variant={'dark'} >
            <Container fluid className={'mx-4'}>
                <Navbar.Brand href={'/'}>{brand}</Navbar.Brand>
                <Navbar.Toggle className={'navbar-toggler'} aria-controls={'responsive-navbar-nav'}>
                    <span className={'toggler-icon top-bar'}/>
                    <span className={'toggler-icon middle-bar'}/>
                    <span className={'toggler-icon bottom-bar'}/>
                </Navbar.Toggle>
                <Navbar.Collapse id={'responsive-navbar-nav'} className={'text-start justify-content-md-center'}>
                    <Nav>
                        {
                            links.map(link =>
                                <Nav.Link
                                    key={'nav-link-to-' + link.name}
                                    href={link.path}
                                    className={'me-md-5 ' + ((props.activepath === link.path)? 'text-white': '')}
                                >
                                    {link.name}
                                </Nav.Link>
                            )
                        }
                        <Nav.Link
                            key={'nav-link-to-' + cartLink.name}
                            href={cartLink.path}
                            className={'d-md-none ' + ((props.activepath === cartLink.path)? 'text-white': '')}
                        >
                            {cartLink.name}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className={'d-none d-md-flex'}>
                    <Nav.Link
                        key={'nav-link-to-' + cartLink.name}
                        href={cartLink.path}
                    >
                        <Bag fill={'white'} height={22} width={17} />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MyNavBar