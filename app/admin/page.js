'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Auth from '../../components/Auth'
import Link from 'next/link'

export default function AdminPage() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Admin Dashboard</h3>
        <div className="mt-5">
          {!session ? (
            <Auth />
          ) : (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Successfully authenticated</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>You are now logged in as an administrator.</p>
                  </div>
                  <div className="mt-4">
                    <Link href="/admin/faq" className="text-indigo-600 hover:text-indigo-900">
                      Manage FAQs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}