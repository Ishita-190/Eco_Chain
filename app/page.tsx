"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  Brain,
  Download,
  Loader2,
  Eye,
  FileX,
  Search,
  Calendar,
  User,
  Shield,
  DollarSign,
  FileSignature,
  Image,
  ChevronRight,
  ArrowLeft,
  Leaf,
  Recycle,
  Award,
  BarChart3,
  Globe,
} from "lucide-react";

export default function FeaturesPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedSample, setSelectedSample] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample documents with images
  const sampleDocuments = [
    {
      id: 1,
      name: "Waste Management Report",
      type: "Report",
      description: "Monthly recycling and waste analysis",
      imageUrl: "https://images.unsplash.com/photo-1612838320304-4b2b044e8e6f?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Waste Management Report",
        summary: "This report provides a comprehensive analysis of waste generation, recycling rates, and environmental impact metrics for the specified period.",
        keyPoints: [
          "Total waste generated and recycling rates",
          "Breakdown by material type (plastic, paper, organic, etc.)",
          "Comparison with previous periods and industry benchmarks",
          "Environmental impact calculations",
          "Recommendations for improvement"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Declining recycling rate",
            description: "The recycling rate has decreased by 5% compared to the previous quarter."
          },
          {
            level: "medium",
            issue: "Inconsistent data collection",
            description: "Some waste categories show irregular reporting patterns that may affect accuracy."
          },
          {
            level: "low",
            issue: "Missing regional breakdown",
            description: "The report lacks detailed analysis by geographic regions."
          }
        ],
        recommendations: [
          "Implement targeted recycling campaigns for materials with low recovery rates",
          "Standardize data collection procedures across all facilities",
          "Consider implementing incentives for improved waste segregation",
          "Develop regional action plans based on local waste characteristics",
          "Invest in technology to improve tracking and reporting accuracy"
        ],
        complexity: "Moderate",
        readingTime: "10-15 minutes",
        parties: ["Facility Management", "Environmental Team"],
        effectiveDate: "Current Month",
        jurisdiction: "All Facilities",
        keyClauses: [
          "Waste Classification",
          "Recycling Metrics",
          "Environmental Impact",
          "Comparative Analysis",
          "Recommendations"
        ]
      }
    },
    {
      id: 2,
      name: "Environmental Impact Statement",
      type: "Assessment",
      description: "Environmental impact of business operations",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Environmental Impact Statement",
        summary: "This statement evaluates the environmental consequences of business operations and proposes mitigation strategies for identified impacts.",
        keyPoints: [
          "Assessment of carbon footprint and greenhouse gas emissions",
          "Water usage and impact on local water resources",
          "Waste generation and disposal methods",
          "Impact on local biodiversity and ecosystems",
          "Proposed mitigation and offset measures"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "High carbon emissions",
            description: "Current operations exceed industry benchmarks for carbon emissions by 15%."
          },
          {
            level: "medium",
            issue: "Water stress in local area",
            description: "Operations are located in a region experiencing water stress."
          },
          {
            level: "low",
            issue: "Limited biodiversity data",
            description: "The assessment lacks comprehensive baseline biodiversity data."
          }
        ],
        recommendations: [
          "Develop a carbon reduction plan with specific targets and timelines",
          "Implement water conservation measures and recycling systems",
          "Conduct a comprehensive biodiversity baseline study",
          "Explore renewable energy options to reduce carbon footprint",
          "Engage with local communities on environmental initiatives"
        ],
        complexity: "Complex",
        readingTime: "20-25 minutes",
        parties: ["Company", "Environmental Consultants", "Regulatory Body"],
        effectiveDate: "Annual Assessment",
        jurisdiction: "Operating Regions",
        keyClauses: [
          "Carbon Footprint",
          "Water Usage",
          "Waste Management",
          "Biodiversity Impact",
          "Mitigation Measures"
        ]
      }
    },
    {
      id: 3,
      name: "Sustainability Policy",
      type: "Policy",
      description: "Corporate sustainability and environmental policy",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Sustainability Policy",
        summary: "This policy outlines the organization's commitment to sustainable practices, environmental responsibility, and social impact goals.",
        keyPoints: [
          "Environmental commitments and targets",
          "Social responsibility initiatives",
          "Governance and accountability mechanisms",
          "Stakeholder engagement strategies",
          "Implementation timeline and measurement"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Vague targets",
            description: "Many sustainability targets lack specific metrics or timelines."
          },
          {
            level: "medium",
            issue: "Limited accountability",
            description: "The policy lacks clear accountability mechanisms for implementation."
          },
          {
            level: "low",
            issue: "Insufficient stakeholder engagement",
            description: "The policy could benefit from more robust stakeholder consultation processes."
          }
        ],
        recommendations: [
          "Establish specific, measurable, time-bound sustainability targets",
          "Create clear governance structures with defined roles and responsibilities",
          "Develop a comprehensive stakeholder engagement plan",
          "Implement regular reporting mechanisms to track progress",
          "Align the policy with recognized sustainability frameworks"
        ],
        complexity: "Moderate",
        readingTime: "15-20 minutes",
        parties: ["Board of Directors", "Management", "Stakeholders"],
        effectiveDate: "Policy Implementation Date",
        jurisdiction: "Organization-wide",
        keyClauses: [
          "Environmental Commitments",
          "Social Responsibility",
          "Governance",
          "Stakeholder Engagement",
          "Implementation"
        ]
      }
    },
    {
      id: 4,
      name: "Carbon Footprint Analysis",
      type: "Analysis",
      description: "Detailed carbon emissions and reduction plan",
      imageUrl: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=300&h=400&fit=crop",
      mockAnalysis: {
        documentType: "Carbon Footprint Analysis",
        summary: "This analysis quantifies the organization's carbon emissions across all operations and outlines strategies for achieving carbon neutrality.",
        keyPoints: [
          "Direct and indirect emissions inventory",
          "Emissions by source category and business unit",
          "Comparison with industry benchmarks and previous years",
          "Carbon reduction targets and pathways",
          "Investment requirements and ROI projections"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Scope 3 emissions gap",
            description: "Significant portion of emissions fall under Scope 3 with limited control mechanisms."
          },
          {
            level: "medium",
            issue: "Ambitious reduction timeline",
            description: "Proposed reduction targets may be challenging to achieve with current technology."
          },
          {
            level: "low",
            issue: "Data quality issues",
            description: "Some emission factors used are based on industry averages rather than actual measurements."
          }
        ],
        recommendations: [
          "Develop a comprehensive Scope 3 emissions management strategy",
          "Invest in renewable energy and energy efficiency measures",
          "Implement enhanced data collection systems for direct measurement",
          "Explore carbon offset projects for hard-to-abate emissions",
          "Consider setting science-based targets aligned with climate goals"
        ],
        complexity: "Complex",
        readingTime: "20-25 minutes",
        parties: ["Sustainability Team", "Operations", "Finance"],
        effectiveDate: "Annual Analysis",
        jurisdiction: "All Operations",
        keyClauses: [
          "Emissions Inventory",
          "Reduction Targets",
          "Investment Plan",
          "Monitoring",
          "Reporting"
        ]
      }
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    const allowedTypes = [".pdf", ".doc", ".docx", ".txt"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      alert("Please upload a PDF, DOC, DOCX, or TXT file.");
      return;
    }
    setUploadedFile(file);
    setAnalysis(null);
    setShowAnalysis(false);
  };

  const analyzeDocument = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    setShowAnalysis(false);
    
    // Simulate document analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Check if this is a sample document
    const sampleDoc = sampleDocuments.find(doc => 
      uploadedFile.name.toLowerCase().includes(doc.name.toLowerCase().replace(/\s+/g, "-"))
    );
    
    if (sampleDoc) {
      // Use the mock analysis for the sample document
      setAnalysis(sampleDoc.mockAnalysis);
      setSelectedSample(sampleDoc);
    } else {
      // Mock analysis results for uploaded document
      const mockAnalysis = {
        documentType: uploadedFile.name.includes("report")
          ? "Environmental Report"
          : uploadedFile.name.includes("policy")
            ? "Sustainability Policy"
            : uploadedFile.name.includes("assessment")
              ? "Environmental Assessment"
              : "Environmental Document",
        summary:
          "This document provides important information about environmental impact, sustainability initiatives, and compliance with environmental regulations.",
        keyPoints: [
          "Environmental impact assessment and metrics",
          "Sustainability initiatives and targets",
          "Compliance with environmental regulations",
          "Stakeholder engagement and communication",
          "Future plans and improvement strategies"
        ],
        potentialConcerns: [
          {
            level: "high",
            issue: "Data accuracy concerns",
            description:
              "Some environmental metrics may not be based on direct measurements.",
          },
          {
            level: "medium",
            issue: "Implementation gaps",
            description:
              "Proposed initiatives may lack detailed implementation plans.",
          },
          {
            level: "low",
            issue: "Limited scope",
            description: "The document may not address all relevant environmental aspects.",
          },
        ],
        recommendations: [
          "Verify all environmental data through direct measurement where possible",
          "Develop detailed implementation plans with clear timelines and responsibilities",
          "Expand the scope to include all relevant environmental aspects",
          "Consider third-party verification of environmental claims",
          "Establish regular review cycles to assess progress and update strategies"
        ],
        complexity: "Moderate",
        readingTime: "15-20 minutes",
      };
      setAnalysis(mockAnalysis);
      setSelectedSample(null);
    }
    
    setIsAnalyzing(false);
    // Add a slight delay before showing analysis for smoother transition
    setTimeout(() => setShowAnalysis(true), 100);
  };

  const getConcernColor = (level: string) => {
    switch (level) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const loadSampleDocument = (doc: any) => {
    // Create a mock file for demonstration
    const file = new File(
      [""],
      `${doc.name.toLowerCase().replace(/\s+/g, "-")}.pdf`,
      { type: "application/pdf" },
    );
    setUploadedFile(file);
    setSelectedSample(doc);
    setActiveTab("upload");
  };

  const resetDocument = () => {
    setUploadedFile(null);
    setAnalysis(null);
    setShowAnalysis(false);
    setSelectedSample(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const goBackToSamples = () => {
    setActiveTab("samples");
    setShowAnalysis(false);
    setTimeout(() => {
      setAnalysis(null);
      setUploadedFile(null);
      setSelectedSample(null);
    }, 300);
  };

  return (
    <>
      {/* Import Google Fonts dynamically */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto+Slab&family=Pacifico&display=swap');
          .dynamic-font-main {
            font-family: 'Montserrat', sans-serif;
          }
          .dynamic-font-subtitle {
            font-family: 'Roboto Slab', serif;
          }
          .dynamic-font-cta {
            font-family: 'Pacifico', cursive;
          }
        `}
      </style>
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-white relative overflow-hidden bg-green-700">
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 transition-all duration-1000 from-emerald-700 via-teal-600 to-cyan-600 bg-gradient-to-br mix-blend-overlay`} />
        
        {/* Main Content */}
        <motion.div 
          className="relative z-10 max-w-6xl w-full px-6 py-12 bg-black/40 rounded-3xl shadow-xl border border-white/20 mx-4 backdrop-blur-md my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="dynamic-font-main text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200 select-none"
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Environmental Document Analysis <span className="text-emerald-300 animate-pulse">🌱</span>
          </motion.h1>
          
          <motion.p 
            className="dynamic-font-subtitle text-lg md:text-xl font-light mb-10 text-gray-100 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Upload your environmental documents for AI-powered analysis, insights, and recommendations to improve sustainability.
          </motion.p>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/30 backdrop-blur-sm">
              <TabsTrigger value="upload" className="data-[state=active]:bg-emerald-600">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </TabsTrigger>
              <TabsTrigger value="samples" className="data-[state=active]:bg-emerald-600">
                <FileText className="mr-2 h-4 w-4" />
                Sample Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6 mt-6">
              {/* Upload Section */}
              <Card className={`transition-all duration-300 bg-black/30 backdrop-blur-sm border-white/20 ${uploadedFile ? 'opacity-100' : 'opacity-100'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Upload className="h-5 w-5 text-emerald-300" />
                    Upload Environmental Document
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Supported formats: PDF, DOC, DOCX, TXT (max 10MB)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-emerald-400 bg-emerald-900/30 scale-[1.02]"
                        : "border-white/30 hover:border-emerald-400/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleChange}
                    />
                    {uploadedFile ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <FileText className="h-16 w-16 text-emerald-300 mx-auto transition-transform duration-300 hover:scale-110" />
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-lg text-white">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-200">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button 
                            onClick={analyzeDocument} 
                            disabled={isAnalyzing}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 hover:scale-105"
                          >
                            {isAnalyzing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Brain className="mr-2 h-4 w-4" />
                                Analyze Document
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={resetDocument}
                            className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                          >
                            <FileX className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-16 w-16 text-emerald-300 mx-auto transition-transform duration-300 hover:scale-110" />
                        <div>
                          <p className="text-lg font-medium text-white">
                            Drop your document here
                          </p>
                          <p className="text-gray-200">
                            or click to browse files
                          </p>
                        </div>
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 hover:scale-105"
                        >
                          Select File
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="samples" className="space-y-6 mt-6">
              <Card className="bg-black/30 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Sample Environmental Documents</CardTitle>
                  <CardDescription className="text-gray-200">
                    Click on any document to see a detailed analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sampleDocuments.map((doc) => (
                      <Card 
                        key={doc.id} 
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group overflow-hidden bg-black/40 border-white/10"
                        onClick={() => loadSampleDocument(doc)}
                      >
                        <div className="aspect-[3/4] overflow-hidden rounded-t-lg transition-transform duration-300 group-hover:scale-105">
                          <img 
                            src={doc.imageUrl} 
                            alt={doc.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4 transition-colors duration-300 group-hover:bg-black/50">
                          <h3 className="font-medium mb-1 text-white group-hover:text-emerald-300 transition-colors duration-300">{doc.name}</h3>
                          <Badge variant="secondary" className="mb-2 bg-emerald-800/50 text-emerald-200">
                            {doc.type}
                          </Badge>
                          <p className="text-sm text-gray-300">
                            {doc.description}
                          </p>
                          <div className="mt-3 flex items-center text-sm text-emerald-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Analyze <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {/* Loading State */}
          {isAnalyzing && (
            <div className="mt-8">
              <Card className="overflow-hidden bg-black/30 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center">
                        <Brain className="h-8 w-8 text-emerald-300 animate-pulse" />
                      </div>
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-medium text-white">Analyzing Environmental Document</h3>
                    <p className="text-gray-200 text-center max-w-md">
                      Our AI is examining your document to identify key environmental insights, potential impacts, and sustainability recommendations.
                    </p>
                    <div className="w-full max-w-xs bg-emerald-900/30 rounded-full h-2.5 mt-4">
                      <div className="bg-emerald-500 h-2.5 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {/* Analysis Results */}
          {analysis && (
            <div className={`mt-8 space-y-6 transition-all duration-500 ${showAnalysis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Back button */}
              <Button 
                variant="outline" 
                onClick={goBackToSamples}
                className="mb-4 border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Samples
              </Button>
              
              {/* Document Overview */}
              <Card className="transition-all duration-300 hover:shadow-md bg-black/30 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Eye className="h-5 w-5 text-emerald-300" />
                    Document Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-white/30 text-white transition-all duration-300 hover:bg-emerald-600/50 hover:text-white">
                      <Leaf className="h-3 w-3 mr-1" />
                      Type: {analysis.documentType}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white transition-all duration-300 hover:bg-emerald-600/50 hover:text-white">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Complexity: {analysis.complexity}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white transition-all duration-300 hover:bg-emerald-600/50 hover:text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      Reading Time: {analysis.readingTime}
                    </Badge>
                    {analysis.parties && (
                      <Badge variant="outline" className="border-white/30 text-white transition-all duration-300 hover:bg-emerald-600/50 hover:text-white">
                        <User className="h-3 w-3 mr-1" />
                        {analysis.parties.join(" & ")}
                      </Badge>
                    )}
                    {analysis.effectiveDate && (
                      <Badge variant="outline" className="border-white/30 text-white transition-all duration-300 hover:bg-emerald-600/50 hover:text-white">
                        <Calendar className="h-3 w-3 mr-1" />
                        {analysis.effectiveDate}
                      </Badge>
                    )}
                    {analysis.jurisdiction && (
                      <Badge variant="outline" className="border-white/30 text-white transition-all duration-300 hover:bg-emerald-600/50 hover:text-white">
                        <Globe className="h-3 w-3 mr-1" />
                        {analysis.jurisdiction}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-200">{analysis.summary}</p>
                  
                  {analysis.keyClauses && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2 text-white">Key Environmental Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keyClauses.map((clause: string, index: number) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs border-white/30 text-white transition-all duration-300 hover:bg-emerald-600/50 hover:text-white"
                          >
                            <Recycle className="h-2 w-2 mr-1" />
                            {clause}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Key Points */}
              <Card className="transition-all duration-300 hover:shadow-md bg-black/30 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Key Environmental Insights</CardTitle>
                  <CardDescription className="text-gray-200">
                    Important environmental elements identified in your document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.keyPoints.map((point: string, index: number) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-3 transition-all duration-300 hover:bg-black/20 p-2 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Potential Concerns */}
              <Card className="transition-all duration-300 hover:shadow-md bg-black/30 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Environmental Concerns
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Areas that may require additional attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.potentialConcerns.map(
                    (concern: any, index: number) => (
                      <Alert 
                        key={index} 
                        className={`transition-all duration-300 hover:shadow-sm ${
                          concern.level === 'high' ? 'border-red-200/30 bg-red-900/20 dark:bg-red-950/20' : 
                          concern.level === 'medium' ? 'border-amber-200/30 bg-amber-900/20 dark:bg-amber-950/20' : 
                          'border-blue-200/30 bg-blue-900/20 dark:bg-blue-950/20'
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white">{concern.issue}</span>
                            <Badge
                              variant={getConcernColor(concern.level) as any}
                            >
                              {concern.level} priority
                            </Badge>
                          </div>
                          <AlertDescription className="text-gray-200">
                            {concern.description}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ),
                  )}
                </CardContent>
              </Card>
              
              {/* Recommendations */}
              <Card className="transition-all duration-300 hover:shadow-md bg-black/30 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Sustainability Recommendations</CardTitle>
                  <CardDescription className="text-gray-200">
                    Suggested next steps for improving environmental impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.recommendations.map(
                      (rec: string, index: number) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-3 transition-all duration-300 hover:bg-black/20 p-2 rounded-lg"
                        >
                          <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-200">{rec}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Sample Document Preview */}
              {selectedSample && (
                <Card className="transition-all duration-300 hover:shadow-md bg-black/30 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Image className="h-5 w-5 text-emerald-300" />
                      Document Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <img 
                        src={selectedSample.imageUrl} 
                        alt="Document preview"
                        className="max-w-md rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </motion.div>
        {/* Footer */}
        <footer className="relative z-10 mt-16 text-sm text-gray-300 pb-8 select-none">
          <div className="container mx-auto px-6">
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 dynamic-font-subtitle">
                © {new Date().getFullYear()} EcoCommerce. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors dynamic-font-main">Privacy</a>
                <a href="#" className="hover:text-white transition-colors dynamic-font-main">Terms</a>
                <a href="#" className="hover:text-white transition-colors dynamic-font-main">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
