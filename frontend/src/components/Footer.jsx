import React, { useId } from 'react'
import { assets, footer_data } from '../assets/assets'
import { Link } from 'react-router-dom';
import Logo from './Logo';
function Footer() {
    const keyId = useId();

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
            <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
                <div>
                    <div className='w-32 sm:w-44' >
                        <Logo/>
                    </div>
                    <p className='max-w-[410px] mt-6'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
                    </p>
                </div>
                <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                    {
                        footer_data.map((section, index) => (
                            <div key={`${keyId}-${index}`}>
                                <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
                                    {section.title}
                                </h3>
                                <ul className='text-sm space-y-1'>
                                    {section.links.map((link, i) => (
                                        <li key={`${keyId}-${section.title}-${i}`}>
                                            {link.url.startsWith('http') ? (
                                                <a
                                                    href={link.url}
                                                    className='hover:underline text-gray-600 transition'
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    {link.name}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={link.url}
                                                    className='hover:underline text-gray-600 transition'
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
            <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
                Copyright 2025  All Right Reserved.
            </p>
        </div>
    )
}

export default Footer   