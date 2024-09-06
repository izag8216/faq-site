'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function FAQManagement() {
  const [faqs, setFaqs] = useState([])
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '' })
  const [editingFaq, setEditingFaq] = useState(null)

  useEffect(() => {
    fetchFaqs()
  }, [])

  async function fetchFaqs() {
    const { data, error } = await supabase.from('faq-site').select('*')
    if (error) console.error('Error fetching FAQs:', error)
    else setFaqs(data)
  }

  async function addFaq(e) {
    e.preventDefault()
    const { data, error } = await supabase.from('faq-site').insert([newFaq])
    if (error) console.error('Error adding FAQ:', error)
    else {
      setNewFaq({ question: '', answer: '', category: '' })
      fetchFaqs()
    }
  }

  async function updateFaq(e) {
    e.preventDefault()
    const { data, error } = await supabase
      .from('faq-site')
      .update(editingFaq)
      .eq('id', editingFaq.id)
    if (error) console.error('Error updating FAQ:', error)
    else {
      setEditingFaq(null)
      fetchFaqs()
    }
  }

  async function deleteFaq(id) {
    const { data, error } = await supabase.from('faq-site').delete().eq('id', id)
    if (error) console.error('Error deleting FAQ:', error)
    else fetchFaqs()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">FAQ Management</h2>
      
      {/* Add new FAQ form */}
      <form onSubmit={addFaq} className="space-y-4">
        <input
          type="text"
          placeholder="Question"
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Answer"
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newFaq.category}
          onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add FAQ</button>
      </form>

      {/* List of FAQs */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border p-4 rounded">
            {editingFaq && editingFaq.id === faq.id ? (
              <form onSubmit={updateFaq} className="space-y-2">
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
                <button onClick={() => setEditingFaq(null)} className="px-4 py-2 bg-gray-500 text-white rounded ml-2">Cancel</button>
              </form>
            ) : (
              <>
                <h3 className="font-bold">{faq.question}</h3>
                <p>{faq.answer}</p>
                <p className="text-sm text-gray-500">Category: {faq.category}</p>
                <button onClick={() => setEditingFaq(faq)} className="px-4 py-2 bg-yellow-500 text-white rounded mt-2">Edit</button>
                <button onClick={() => deleteFaq(faq.id)} className="px-4 py-2 bg-red-500 text-white rounded mt-2 ml-2">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}