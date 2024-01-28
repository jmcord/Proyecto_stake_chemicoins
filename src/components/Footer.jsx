export default function Footer(){
    return (
        <footer className="text-sm py-4 px-3 sm:text-lg bg-white border-t shadow-md flex justify-center">
            <p>Derechos de autor &copy; {new Date().getFullYear()} Chema Enterprises Inc.</p>
        </footer> 
    )
}