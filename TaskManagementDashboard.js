import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, User, Calendar, Bell, Lightbulb, Leaf } from 'lucide-react';

const skillAreas = [
  { id: 'planning', label: 'Planning', emoji: '📅' },
  { id: 'organizing', label: 'Organizing', emoji: '📊' },
  { id: 'prioritizing', label: 'Prioritizing', emoji: '🏆' },
  { id: 'focusing', label: 'Focusing', emoji: '🎯' },
  { id: 'starting', label: 'Starting Tasks', emoji: '🚀' },
  { id: 'completing', label: 'Completing Tasks', emoji: '✅' },
  { id: 'timeManaging', label: 'Managing Time', emoji: '⏰' },
  { id: 'adapting', label: 'Adapting to Changes', emoji: '🔄' },
];

const visualizationOptions = [
  { value: 'list', label: 'List View', icon: '📝' },
  { value: 'kanban', label: 'Kanban Board', icon: '🗂️' },
  { value: 'calendar', label: 'Calendar View', icon: '📅' },
  { value: 'getReadyDoDone', label: 'Get Ready, Do, Done', icon: '🚦' },
  { value: 'priority', label: 'Priority Matrix', icon: '🔢' },
  { value: 'mindMap', label: 'Mind Map', icon: '🌳' },
];

const reminderConnections = [
  { value: 'google', label: 'Google', icon: '🇬' },
  { value: 'apple', label: 'Apple', icon: '🍎' },
  { value: 'microsoft', label: 'Microsoft', icon: '🪟' },
];

const CollapsibleSection = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md">
        <CardHeader className="text-xl font-semibold text-indigo-700 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="inline-block mr-2" /> {title}
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [visualization, setVisualization] = useState('');
  const [reminders, setReminders] = useState([]);

  const handleProfileChange = (skill, area) => {
    setProfile(prev => ({
      ...prev,
      [skill]: area
    }));
  };

  const handleReminderConnection = async (provider) => {
    console.log(`Connecting to ${provider}...`);
    setReminders(prev => [...prev, provider]);
  };

  return (
    <CollapsibleSection title="Your Growth Profile" icon={User}>
      <div className="overflow-x-auto">
        <table className="w-full mb-6 bg-white rounded-lg overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-2 text-left">Skill Area</th>
              <th className="px-4 py-2 text-center">Strength</th>
              <th className="px-4 py-2 text-center">Growth</th>
            </tr>
          </thead>
          <tbody>
            {skillAreas.map(({ id, label, emoji }) => (
              <tr key={id} className="border-b">
                <td className="px-4 py-2">{emoji} {label}</td>
                <td className="px-4 py-2 text-center">
                  <Checkbox 
                    checked={profile[id] === 'strength'}
                    onCheckedChange={() => handleProfileChange(id, 'strength')}
                    className="text-green-500"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <Checkbox 
                    checked={profile[id] === 'growth'}
                    onCheckedChange={() => handleProfileChange(id, 'growth')}
                    className="text-amber-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block mr-2" /> Preferred task visualization
          </label>
          <Select onValueChange={setVisualization} value={visualization}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a visualization" />
            </SelectTrigger>
            <SelectContent>
              {visualizationOptions.map(({ value, label, icon }) => (
                <SelectItem key={value} value={value}>
                  {icon} {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Bell className="inline-block mr-2" /> Reminder Connections
          </label>
          {reminderConnections.map(({ value, label, icon }) => (
            <div key={value} className="flex items-center space-x-2 mt-1">
              <Button 
                onClick={() => handleReminderConnection(value)}
                disabled={reminders.includes(value)}
                className={`${reminders.includes(value) ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded`}
              >
                {icon} {label} {reminders.includes(value) ? '(Connected)' : '(Connect)'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
};

const TaskInput = () => {
  const [taskInput, setTaskInput] = useState('');
  const [taskType, setTaskType] = useState('');

  const handleTaskSubmit = () => {
    console.log('Task list created:', { taskInput, taskType });
    setTaskInput('');
    setTaskType('');
  };

  return (
    <CollapsibleSection title="Create Your Task List" icon={Lightbulb}>
      <Textarea 
        placeholder="What would you like to accomplish? List your tasks here, one per line."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="mb-4 bg-white border-gray-300 h-40"
      />
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select what type of task list we are completing:
      </label>
      <Select onValueChange={setTaskType} value={taskType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a list type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily Tasks</SelectItem>
          <SelectItem value="weekly">Weekly Goals</SelectItem>
          <SelectItem value="longTerm">Long-term Project</SelectItem>
          <SelectItem value="recurring">Recurring Responsibilities</SelectItem>
          <SelectItem value="quickTodo">Quick To-Dos</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      {taskType === 'other' && (
        <Input 
          placeholder="Specify list type"
          className="mt-4 bg-white border-gray-300"
        />
      )}
      <Button onClick={handleTaskSubmit} className="w-full bg-teal-500 hover:bg-teal-600 text-white mt-4">
        Create Task List
      </Button>
    </CollapsibleSection>
  );
};

const DashboardTab1 = () => {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 flex items-center justify-center">
        <Leaf className="inline-block mr-2" /> Mindful Task Management
      </h2>
      <UserProfile />
      <TaskInput />
    </div>
  );
};

export default DashboardTab1;


import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ListTodo } from 'lucide-react';

const TaskOrganizer = ({ taskInput }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (taskInput) {
      const newTasks = taskInput.split('\n')
        .filter(task => task.trim() !== '')
        .map((task, index) => ({
          id: index + 1,
          title: task.trim(),
          motivation: 1,
          importance: 1,
          urgency: 1,
          estimatedTime: 30,
          difficulty: 1,
          dependencies: '',
          deadline: '',
        }));
      setTasks(newTasks);
    }
  }, [taskInput]);

  const handleTaskUpdate = (id, field, value) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const ratingOptions = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium-Low' },
    { value: 3, label: 'Medium-High' },
    { value: 4, label: 'High' },
  ];

  const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md mb-4">
          <CardHeader className="text-xl font-semibold text-indigo-700 flex items-center justify-between">
            <div className="flex items-center">
              <ListTodo className="inline-block mr-2" /> {title}
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>{children}</CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  };

  return (
    <div>
      <CollapsibleSection title="Organize Your Tasks">
        <div className="overflow-x-auto">
          <table className="w-full mb-6 bg-white rounded-lg overflow-hidden">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Motivation</th>
                <th className="px-4 py-2">Importance</th>
                <th className="px-4 py-2">Urgency</th>
                <th className="px-4 py-2">Est. Time (min)</th>
                <th className="px-4 py-2">Difficulty</th>
                <th className="px-4 py-2">Dependencies</th>
                <th className="px-4 py-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-b">
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">
                    <Select 
                      value={task.motivation} 
                      onValueChange={(value) => handleTaskUpdate(task.id, 'motivation', Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Select 
                      value={task.importance} 
                      onValueChange={(value) => handleTaskUpdate(task.id, 'importance', Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Select 
                      value={task.urgency} 
                      onValueChange={(value) => handleTaskUpdate(task.id, 'urgency', Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Input 
                      type="number" 
                      value={task.estimatedTime}
                      onChange={(e) => handleTaskUpdate(task.id, 'estimatedTime', Number(e.target.value))}
                      className="w-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Select 
                      value={task.difficulty} 
                      onValueChange={(value) => handleTaskUpdate(task.id, 'difficulty', Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Input 
                      value={task.dependencies}
                      onChange={(e) => handleTaskUpdate(task.id, 'dependencies', e.target.value)}
                      className="w-full"
                      placeholder="Task IDs (comma-separated)"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input 
                      type="date"
                      value={task.deadline}
                      onChange={(e) => handleTaskUpdate(task.id, 'deadline', e.target.value)}
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Priority Matrix">
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Urgent and Important', filter: t => t.urgency > 2 && t.importance > 2, color: 'bg-red-100' },
            { title: 'Important, Not Urgent', filter: t => t.urgency <= 2 && t.importance > 2, color: 'bg-yellow-100' },
            { title: 'Urgent, Not Important', filter: t => t.urgency > 2 && t.importance <= 2, color: 'bg-blue-100' },
            { title: 'Neither Urgent Nor Important', filter: t => t.urgency <= 2 && t.importance <= 2, color: 'bg-green-100' },
          ].map(quadrant => (
            <div key={quadrant.title} className={`${quadrant.color} p-4 rounded-lg shadow`}>
              <h4 className="font-semibold mb-2">{quadrant.title}</h4>
              <ul className="list-disc pl-5">
                {tasks.filter(quadrant.filter).map(task => (
                  <li key={task.id} className="mb-1">{task.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default TaskOrganizer;
