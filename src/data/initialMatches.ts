import { MatchItem } from "@/types/sparkmatch";
import { initialProfiles } from "./mockProfiles";

export const initialMatches: MatchItem[] = [
  {
    id: "m1",
    profile: initialProfiles[0], // Elena Rostova
    lastMessage: "Haha sounds like a deal! Sunday 11 AM at Devoción? ☕",
    lastMessageTime: "2m ago",
    unreadCount: 1,
    matchedAt: "Today at 9:30 AM",
    isSuperMatch: true,
    messages: [
      {
        id: "msg-1-1",
        sender: "match",
        text: "Hey Alex! Loved your vibe and that coffee photo from Brooklyn 🥐",
        timestamp: "9:32 AM",
        status: "read"
      },
      {
        id: "msg-1-2",
        sender: "user",
        text: "Hey Elena! Thanks! I saw you love ceramics and secret ramen spots. What's your number one spot right now?",
        timestamp: "9:40 AM",
        status: "read"
      },
      {
        id: "msg-1-3",
        sender: "match",
        text: "Oh you gotta check out Minca in Alphabet City! Super rich broth and vintage vinyl playing. What's your favorite café?",
        timestamp: "9:45 AM",
        status: "read"
      },
      {
        id: "msg-1-4",
        sender: "user",
        text: "Devoción in Williamsburg without a doubt. Best yellow bourbon pour-over in the city!",
        timestamp: "9:50 AM",
        status: "read"
      },
      {
        id: "msg-1-5",
        sender: "match",
        text: "Haha sounds like a deal! Sunday 11 AM at Devoción? ☕",
        timestamp: "9:55 AM",
        status: "delivered"
      }
    ]
  },
  {
    id: "m2",
    profile: initialProfiles[2], // Maya Lin
    lastMessage: "Are you going to that rooftop DJ set in Bushwick on Friday?",
    lastMessageTime: "1h ago",
    unreadCount: 2,
    matchedAt: "Yesterday",
    isSuperMatch: false,
    messages: [
      {
        id: "msg-2-1",
        sender: "match",
        text: "A software engineer who also loves electronic music? Finally someone who understands why I code with house music in my headphones haha 🎧",
        timestamp: "Yesterday 4:15 PM",
        status: "read"
      },
      {
        id: "msg-2-2",
        sender: "user",
        text: "It is the only way to write bug-free code at 1 AM! What DAWs do you use for mixing?",
        timestamp: "Yesterday 4:30 PM",
        status: "read"
      },
      {
        id: "msg-2-3",
        sender: "match",
        text: "Ableton Live all day! Plus Pioneer CDJs when I play live. Are you going to that rooftop DJ set in Bushwick on Friday?",
        timestamp: "Yesterday 6:00 PM",
        status: "read"
      }
    ]
  },
  {
    id: "m3",
    profile: initialProfiles[5], // Liam O'Connor
    lastMessage: "I'll bring my acoustic guitar if you bring the wine 😉",
    lastMessageTime: "3h ago",
    unreadCount: 0,
    matchedAt: "2 days ago",
    isSuperMatch: true,
    messages: [
      {
        id: "msg-3-1",
        sender: "match",
        text: "Hey! You have an amazing music taste. Fleet Foxes and Bon Iver on repeat?",
        timestamp: "2 days ago",
        status: "read"
      },
      {
        id: "msg-3-2",
        sender: "user",
        text: "Always! Especially on rainy autumn afternoons.",
        timestamp: "2 days ago",
        status: "read"
      },
      {
        id: "msg-3-3",
        sender: "match",
        text: "I'll bring my acoustic guitar if you bring the wine 😉",
        timestamp: "2 days ago",
        status: "read"
      }
    ]
  },
  {
    id: "m4",
    profile: initialProfiles[6], // Chloe Dupont
    lastMessage: "Bonsoir! Let me know when you want to try the real French brioche 🥐",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    matchedAt: "3 days ago",
    isSuperMatch: false,
    messages: [
      {
        id: "msg-4-1",
        sender: "match",
        text: "Bonsoir! Let me know when you want to try the real French brioche 🥐",
        timestamp: "3 days ago",
        status: "read"
      }
    ]
  },
  {
    id: "m5",
    profile: initialProfiles[8], // Zoe Cole
    lastMessage: "Catan rematch this Wednesday night? I promise not to hoard all the ore this time!",
    lastMessageTime: "2d ago",
    unreadCount: 0,
    matchedAt: "4 days ago",
    isSuperMatch: false,
    messages: [
      {
        id: "msg-5-1",
        sender: "match",
        text: "Catan rematch this Wednesday night? I promise not to hoard all the ore this time!",
        timestamp: "4 days ago",
        status: "read"
      }
    ]
  },
  {
    id: "m6",
    profile: initialProfiles[10], // Sofia Rossi
    lastMessage: "You matched with Sofia! Say hello.",
    lastMessageTime: "Just now",
    unreadCount: 0,
    matchedAt: "10m ago",
    isSuperMatch: true,
    messages: []
  }
];
