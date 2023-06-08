"use client"
import { Menu } from 'antd';
import Link from 'next/link';
import {usePathname, useRouter} from "next/navigation";
import {useMemo, useState} from "react";

const Navbar = () => {
    const router = useRouter()
    const [current, setCurrent] = useState('1');
    const pathname = usePathname();
    console.log(pathname)
    const routes = useMemo(() => [
        {
            key: '1',
            route: '/',
            label: 'Apriori',
            onClick: () => {
                router.push('/')
                setCurrent('1');
            }
        },
        {
            key: '2',
            route: '/k-means',
            label: 'K-means',
            onClick: () => {
                router.push('/k-means')
                setCurrent('2');
            }
        },
        {
            key: '3',
            route: '/hierarchical',
            label: 'Hierarchical',
            onClick: () => {
                router.push('/hierarchical')
                setCurrent('3');
            }
        },
        {
            key: '4',
            route:'/decision-tree',
            label: 'Decision Tree',
            onClick: () => {
                router.push('/decision-tree')
                setCurrent('4')
            }
        }
    ], [pathname]);



    return (
        <Menu theme="dark" mode="horizontal" items={routes}> selectedKeys={[current]}
        </Menu>
    );
};

export default Navbar;
