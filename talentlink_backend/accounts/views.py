from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Profile, Project, Proposal, User
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    ProjectSerializer,
    ProposalSerializer,
    UserSerializer,
)

# ---------- Test View ----------
def test_view(request):
    return HttpResponse("Accounts app is working!")

# ---------- Register View ----------
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

# ---------- Profile APIView (for logged-in user) ----------
class ProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

# ---------- Profile ViewSet ----------
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# ---------- Project ViewSet ----------
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Search + Filter
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'description', 'category']   # Search by these fields
    filterset_fields = ['category', 'budget', 'duration']  # Filter by these fields

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

# ---------- Proposal ViewSet ----------
class ProposalViewSet(viewsets.ModelViewSet):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Optional: filter proposals by status
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'project']

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)
