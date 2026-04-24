from rest_framework import serializers

from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    is_complete = serializers.BooleanField(default=False)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'is_complete', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
