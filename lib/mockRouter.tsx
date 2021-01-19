import { RouterContext } from 'next/dist/next-server/lib/router-context'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Router from 'next/router'

export default function MockRouter({ children, path }) {
    const [pathname, setPathname] = useState(path);
    
    const mockRouter: any = {
        pathname,
        prefetch: () => {},
        push: async(newPathname) => {
            setPathname(newPathname);
        }
    }

    Router.router = mockRouter

    return (
        <RouterContext.Provider value={mockRouter}>
            {children}
        </RouterContext.Provider>
    )
}


MockRouter.propTypes = {
    children: PropTypes.node.isRequired
}