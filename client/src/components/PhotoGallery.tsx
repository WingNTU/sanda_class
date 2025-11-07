import { Card } from "@/components/ui/card";
import { Camera, Image, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import sandaTeamImage from "@/assets/national-sanda.jpg";
import firstClassShoulderTapImage from "@/assets/firstclassshouldertap.jpg";
// Note: Using direct path for video due to MOV format handling
import situpVideoPath from "@/assets/situp-ntumt.mp4";
import boxingVideoPath from "@/assets/boxing.mp4";
import bearcrawlVideoPath from "@/assets/bearcrawl.mp4";
import noodleBoxingVideoPath from "@/assets/firstclassboxing.mp4";
import firstClass1VideoPath from "@/assets/firstclass1.mp4";
import firstClass2VideoPath from "@/assets/firstclass2.mp4";

const PhotoGallery = () => {
    const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
    
    const photos = [
        {
        src: firstClass2VideoPath,
        alt: "Beginner class - Partner drill",
        caption: "Partner drill",
        type: "video"
        },
        {
        src: firstClass1VideoPath,
        alt: "Beginner class - Speed punching drill",
        caption: "Speed punching drill",
        type: "video"
        },
        {
        src: firstClassShoulderTapImage,
        alt: "Shoulder tap drill during beginner class",
        caption: "Shoulder tap drill during beginner class",
        type: "image"
        },
        {
        src: noodleBoxingVideoPath,
        alt: "Beginner class - noodle boxing session",
        caption: "Noodle boxing session",
        type: "video"
        },
        {
        src: situpVideoPath,
        alt: "Training session - sit-ups workout",
        caption: "Training session - building core strength",
        type: "video"
        },
        {
        src: sandaTeamImage,
        alt: "National Sanda team photo",
        caption: "National Sanda Team",
        type: "image"
        },
        {
        src: boxingVideoPath,
        alt: "Training session - boxing workout",
        caption: "Boxing training session",
        type: "video"
        },
        {
        src: bearcrawlVideoPath,
        alt: "Training session - bear crawl workout",
        caption: "Bear crawl training session",
        type: "video"
        },
        // Add more photos here as needed
    ];

    const toggleVideo = (index: number) => {
        const video = document.querySelector(`#video-${index}`) as HTMLVideoElement;
        if (video) {
            const newPlayingVideos = new Set(playingVideos);
            
            if (playingVideos.has(index)) {
                video.pause();
                newPlayingVideos.delete(index);
            } else {
                video.currentTime = 0;
                video.play().catch(console.error);
                newPlayingVideos.add(index);
            }
            
            setPlayingVideos(newPlayingVideos);
        }
    };

    return (
        <section id="gallery" className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
            {/* Gallery Header */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                <Camera className="w-6 h-6 text-martial-gold" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Training Gallery
                </h3>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take a look at our training sessions, competitions, and the Sanda community we've built together
                </p>
            </div>

            {/* Photo Grid - Horizontal Scroll with 2 Rows */}
            <div className="overflow-x-auto pb-4">
                <div className="grid grid-rows-2 grid-flow-col gap-4 min-w-max pr-4" style={{ gridAutoColumns: '300px' }}>
                    {/* Actual Photos and Videos */}
                    {photos.map((photo, index) => (
                        <Card 
                            key={`photo-${index}`} 
                            className="w-72 h-72 bg-gradient-card border-border hover:shadow-card transition-all duration-300 group cursor-pointer overflow-hidden relative"
                        >
                            {photo.type === 'video' ? (
                            <div className="w-full h-full relative">
                                <video 
                                    id={`video-${index}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    controls={false}
                                    onEnded={() => {
                                        const newPlayingVideos = new Set(playingVideos);
                                        newPlayingVideos.delete(index);
                                        setPlayingVideos(newPlayingVideos);
                                    }}
                                    onPause={() => {
                                        const newPlayingVideos = new Set(playingVideos);
                                        newPlayingVideos.delete(index);
                                        setPlayingVideos(newPlayingVideos);
                                    }}
                                >
                                    <source src={photo.src} type="video/mp4" />
                                    <source src={photo.src} type="video/quicktime" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                        <img 
                            src={photo.src} 
                            alt={photo.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        )}
                        
                        {/* Video Play/Pause Button */}
                        {photo.type === 'video' && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleVideo(index);
                            }}
                            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-3 transition-colors z-10"
                        >
                            {playingVideos.has(index) ? (
                                <Pause className="w-5 h-5 text-white fill-white" />
                            ) : (
                                <Play className="w-5 h-5 text-white fill-white" />
                            )}
                        </button>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white">
                            <p className="text-sm font-medium">{photo.caption}</p>
                        </div>
                        </div>
                    </Card>
                    ))}
                    
                    {/* Placeholder cards for remaining slots */}
                    {[...Array(7)].map((_, index) => (
                    <Card 
                        key={`placeholder-${index}`} 
                        className="w-72 h-72 bg-gradient-card border-border hover:shadow-card transition-all duration-300 group cursor-pointer overflow-hidden"
                    >
                        <div className="w-full h-full flex items-center justify-center bg-muted/20 group-hover:bg-muted/30 transition-colors">
                        <div className="text-center">
                            <Image className="w-8 h-8 text-martial-gold/60 mx-auto mb-2" />
                            <span className="text-xs text-muted-foreground">Photo {index + 2}</span>
                        </div>
                        </div>
                    </Card>
                    ))}
                </div>
            </div>

            {/* Gallery Note */}
            <div className="text-center mt-8">
                <Card className="inline-block p-6 bg-martial-red/10 border border-martial-red/20">
                <p className="text-martial-gold font-medium">
                    📸 Gallery coming soon! I'll be adding photos from training sessions and competitions.
                </p>
                </Card>
            </div>
            </div>
        </div>
        </section>
    );
};

export default PhotoGallery;