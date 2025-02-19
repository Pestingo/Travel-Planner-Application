import React, { useState } from 'react';
import { Plane, Calendar, MapPin, Mail, Building2, Wallet, Tag, Flag, PackageCheck, Search, Plus, Trash2, CheckSquare, Square } from 'lucide-react';

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes: string;
  budget: number;
  category: string;
  priority: 'low' | 'medium' | 'high';
  packingList: { id: string; item: string; packed: boolean }[];
}

const categories = ['Business', 'Leisure', 'Family', 'Adventure', 'Educational'];
const priorities = ['low', 'medium', 'high'] as const;

function App() {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [packingItem, setPackingItem] = useState('');
  const [tempPackingList, setTempPackingList] = useState<{ id: string; item: string; packed: boolean }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const addPackingItem = () => {
    if (!packingItem.trim()) return;
    setTempPackingList([
      ...tempPackingList,
      { id: crypto.randomUUID(), item: packingItem, packed: false }
    ]);
    setPackingItem('');
  };

  const removePackingItem = (id: string) => {
    setTempPackingList(tempPackingList.filter(item => item.id !== id));
  };

  const addPlan = () => {
    if (!destination || !startDate || !endDate || !budget) return;
    
    const newPlan = {
      id: crypto.randomUUID(),
      destination,
      startDate,
      endDate,
      notes,
      budget: parseFloat(budget),
      category,
      priority,
      packingList: tempPackingList
    };
    
    setPlans([...plans, newPlan]);
    setDestination('');
    setStartDate('');
    setEndDate('');
    setNotes('');
    setBudget('');
    setCategory(categories[0]);
    setPriority('medium');
    setTempPackingList([]);
  };

  const deletePlan = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
    if (selectedPlan === id) setSelectedPlan(null);
  };

  const togglePackedStatus = (planId: string, itemId: string) => {
    setPlans(plans.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          packingList: plan.packingList.map(item => 
            item.id === itemId ? { ...item, packed: !item.packed } : item
          )
        };
      }
      return plan;
    }));
  };

  const filteredPlans = plans.filter(plan =>
    plan.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Plane className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">StingoTech Sprout Travel</h1>
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <Mail className="h-5 w-5" />
            <span>Pesterpestingo@gmail.com</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Add New Plan Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Plan Your Next Adventure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Where to?"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Budget</label>
              <div className="relative">
                <Wallet className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter budget"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
              <div className="relative">
                <Flag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {priorities.map(p => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Add notes..."
              />
            </div>
          </div>

          {/* Packing List */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Packing List</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={packingItem}
                onChange={(e) => setPackingItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPackingItem()}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Add item to pack..."
              />
              <button
                onClick={addPackingItem}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {tempPackingList.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span>{item.item}</span>
                  <button
                    onClick={() => removePackingItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={addPlan}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Plan
          </button>
        </div>

        {/* Search and Plans List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Search destinations..."
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-gray-50 rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-medium text-gray-900">{plan.destination}</h3>
                      <span className={`text-sm font-medium ${getPriorityColor(plan.priority)}`}>
                        {plan.priority.charAt(0).toUpperCase() + plan.priority.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">{plan.category}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                    </div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      Budget: ${plan.budget.toLocaleString()}
                    </div>
                    {plan.notes && <p className="text-sm text-gray-600 mt-1">{plan.notes}</p>}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlan(plan.id);
                    }}
                    className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                {selectedPlan === plan.id && plan.packingList.length > 0 && (
                  <div className="border-t border-gray-200 p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Packing List</h4>
                    <div className="space-y-2">
                      {plan.packingList.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-2 text-sm"
                          onClick={() => togglePackedStatus(plan.id, item.id)}
                        >
                          {item.packed ? (
                            <CheckSquare className="h-4 w-4 text-green-600 cursor-pointer" />
                          ) : (
                            <Square className="h-4 w-4 text-gray-400 cursor-pointer" />
                          )}
                          <span className={item.packed ? 'line-through text-gray-400' : ''}>
                            {item.item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filteredPlans.length === 0 && (
              <p className="text-center text-gray-500 py-4">No travel plans found. Start planning your next adventure!</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-600">
              <Building2 className="h-5 w-5" />
              <span>StingoTech Sprout</span>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              Design by Pestingo
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;