
export default function Layout({ children }) {

    return (
        <div className='w-100 justify-content-center d-flex'>
            <main>{children}</main>
        </div>
    )
}