'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [faqs, setFaqs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [filteredFaqs, setFilteredFaqs] = useState([])

  useEffect(() => {
    fetchFaqs()
  }, [])

  useEffect(() => {
    const results = faqs.filter(faq =>
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || faq.category === selectedCategory)
    )
    setFilteredFaqs(results)
  }, [searchTerm, selectedCategory, faqs])

  useEffect(() => {
    const uniqueCategories = [...new Set(faqs.map(faq => faq.category))]
    setCategories(uniqueCategories)
  }, [faqs])

  async function fetchFaqs() {
    const { data, error } = await supabase.from('faq-site').select('*')
    if (error) console.error('Error fetching FAQs:', error)
    else setFaqs(data)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">Frequently Asked Questions</h1>
        <p className="mt-5 text-xl text-gray-500">Can't find the answer you're looking for? Reach out to our customer support team.</p>
        
        {/* Search and filter inputs */}
        <div className="mt-8 flex space-x-4">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mt-12">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
            {filteredFaqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-lg font-medium leading-6 text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                <p className="mt-1 text-sm text-gray-400">Category: {faq.category}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}